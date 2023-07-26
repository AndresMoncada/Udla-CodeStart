using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database
{
    public class Topic
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdTopic { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
        public int IdMoodle { get; set; }
        [ForeignKey("IdMoodle")]
        public virtual Moodle Moodle { get; set; }
    }
}
