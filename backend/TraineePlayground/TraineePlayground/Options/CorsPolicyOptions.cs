using System.Collections.Generic;
using Samhammer.Options.Abstractions;

namespace TraineePlayground.Options
{
    [Option]
    public class CorsPolicyOptions
    {
        public List<string> DomainUrls { get; set; }
    }
}
