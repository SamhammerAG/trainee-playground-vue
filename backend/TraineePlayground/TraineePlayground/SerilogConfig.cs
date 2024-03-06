using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Samhammer.Logging.Logstash;
using Serilog;

namespace TraineePlayground
{
    public static class SerilogConfig
    {
        public const string ConsoleTemplate = "{Timestamp:HH:mm:ss.fff} [{Level:u3}] {SourceContext} ==> {Message:lj}{NewLine}{Exception}";

        public static void ConfigureLogger(HostBuilderContext context, LoggerConfiguration logger)
        {
            var config = context.Configuration;
            bool.TryParse(config["serilog:logstash:disable"], out var disableLogstashLogging);
            var consoleTemplate = "[{Level:u3}] {SourceContext} ==> {Message:lj}{NewLine}{Exception}";
            var fileTemplate = "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u}] {ThreadId} {SourceContext} ==> {Message:lj}{NewLine}{Exception}";
            var environmentName = context.HostingEnvironment.EnvironmentName;

            var filePath = config.GetSection("Serilog")?.GetSection("File")?.GetValue<string>("Path");
            var elasticIndexPlaceholders = new Dictionary<string, string>
            {
                { "{environment}", environmentName.ToLower() },
            };

            logger
                .ReadFrom.Configuration(config);

            logger
                .WriteTo.Console(outputTemplate: consoleTemplate)
                .WriteTo.File(filePath, rollingInterval: RollingInterval.Day, outputTemplate: fileTemplate);

            if (!disableLogstashLogging)
            {
                logger.WriteTo.Logstash(config, elasticIndexPlaceholders);
            }

            logger
                .Enrich.WithProperty("EnvironmentName", environmentName)
                .Enrich.WithThreadId()
                .Enrich.WithAssemblyName()
                .Enrich.WithAssemblyVersion()
                .Enrich.WithMachineName()
                .Enrich.WithEnvironmentUserName();
        }
    }
}
