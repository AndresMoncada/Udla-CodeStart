using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database
{
    public class Answer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdAnswer { get; set; }
        public int OrderAnswer { get; set; }
        public bool IsCorrect { get; set; }
        public int IdQuestion { get; set; }
        [ForeignKey("IdQuestion")]
        public virtual Question Question { get; set; }
    }
}
