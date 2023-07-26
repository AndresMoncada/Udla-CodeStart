using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database
{
    public class Evaluation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdEvaluation { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public int IdTopic { get; set; }
        [ForeignKey("IdTopic")]
        public virtual Topic Topic { get; set; }
    }
}
