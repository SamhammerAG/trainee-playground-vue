using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.Options;
using TraineePlayground.Options;

namespace TraineePlayground
{
    public class ConfigureCors : IConfigureOptions<CorsOptions>
    {
        private IOptions<CorsPolicyOptions> Options { get; }

        public ConfigureCors(IOptions<CorsPolicyOptions> options)
        {
            Options = options;
        }

        public void Configure(CorsOptions options)
        {
            if (Options.Value.DomainUrls == null)
            {
                return;
            }

            options.AddDefaultPolicy(builder =>
            {
                builder
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins(Options.Value.DomainUrls.ToArray())
                    .SetIsOriginAllowedToAllowWildcardSubdomains();
            });
        }
    }
}
