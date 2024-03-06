using Microsoft.Extensions.Configuration;

namespace TraineePlayground
{
    public static class ConfigBuilder
    {
        public static void ConfigureAppConfiguration(IConfigurationBuilder config)
        {
            config
                .AddJsonFile("appsettings.user.json", optional: true);
        }
    }
}
