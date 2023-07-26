using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database
{
    public class Complement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdComplement { get; set; }
        public string Description { get; set; }
        public string Reference { get; set; }
        public string URL { get; set; }
        public int Type { get; set; }
        public int IdMoodle { get; set; }
        [ForeignKey("IdMoodle")]
        public virtual Moodle Moodle { get; set; }
    }
}
