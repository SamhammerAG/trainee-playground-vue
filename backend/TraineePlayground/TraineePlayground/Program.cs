using System;
using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Converters;
using Samhammer.AspNetCore.HealthChecks.Prtg;
using Samhammer.Options;
using Samhammer.Web.Common.Extensions;
using Serilog;
using Microsoft.Extensions.Logging;
using Samhammer.DependencyInjection;
using TraineePlayground;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console(outputTemplate: SerilogConfig.ConsoleTemplate)
    .CreateBootstrapLogger();

Log.Information("Application starting");

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.ConfigureAppConfiguration(ConfigBuilder.ConfigureAppConfiguration)
        .ConfigureLogging((_, loggingBuilder) => loggingBuilder.ClearProviders())
        .UseSerilog(SerilogConfig.ConfigureLogger)
        .ConfigureServices(services => services.ResolveOptions(builder.Configuration))
        .ConfigureServices(services => services.ResolveDependencies());

    builder.Services
        .AddControllers()
        .AddNewtonsoftJson(c => { c.SerializerSettings.Converters.Add(new StringEnumConverter()); });

    builder.Services
        .ConfigureOptions<ConfigureCors>();

    builder.Services.AddHealthChecks();

    builder.Services.AddSwaggerGen();

    builder.Services.AddCors();

    builder.Services.AddSwaggerGenNewtonsoftSupport();

    var app = builder.Build();

    app.UseDefaultExceptionHandler();

    app.UseDefaultFiles();

    app.UseStaticFiles();

    app.UseSwagger();

    app.UseSwaggerUI();

    app.UseSerilogRequestLogging();

    app.UseRouting();

    app.UseAuthentication();

    app.UseAuthorization();

    app.UseCors();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();

        endpoints.MapHealthChecks("/health", new HealthCheckOptions
        {
            ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse,
        });

        endpoints.MapHealthChecks("/health-prtg", new HealthCheckOptions
        {
            ResponseWriter = PrtgResponseWriter.WriteHealthCheckPrtgResponse,
        });
    });

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.CloseAndFlush();
}
