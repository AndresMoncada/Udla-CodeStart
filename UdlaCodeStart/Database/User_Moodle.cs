using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database
{
    public class User_Moodle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdUser_Moodle { get; set; }
        public int IdMoodle { get; set; }
        [ForeignKey("IdMoodle")]
        public virtual Moodle Moodle { get; set; }

        public int IdUser { get; set; }
        [ForeignKey("IdUser")]
        public virtual User User { get; set; }
        public bool Status { get; set; }
    }
}
