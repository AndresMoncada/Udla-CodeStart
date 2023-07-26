using Microsoft.EntityFrameworkCore;

namespace Database
{
    public class UcsContext : DbContext
    {
        public UcsContext(DbContextOptions<UcsContext> options) : base(options){}

        public DbSet<Answer> Answer { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<Complement> Complement { get; set; }
        public DbSet<Concept> Concept { get; set; }
        public DbSet<Evaluation> Evaluation { get; set; }
        public DbSet<Example> Example { get; set; }
        public DbSet<Moodle> Moodle { get; set; }
        public DbSet<Topic> Topic { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<User_Evaluation> User_Evaluation { get; set; }
        public DbSet<User_Moodle> User_Moodle { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Answer>().ToTable("Answer");
            modelBuilder.Entity<Complement>().ToTable("Complement");
            modelBuilder.Entity<Concept>().ToTable("Concept");
            modelBuilder.Entity<Evaluation>().ToTable("Evaluation");
            modelBuilder.Entity<Example>().ToTable("Example");
            modelBuilder.Entity<Moodle>().ToTable("Moodle");
            modelBuilder.Entity<Question>().ToTable("Question");
            modelBuilder.Entity<Topic>().ToTable("Topic");
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<User_Evaluation>().ToTable("User_Evaluation");
            modelBuilder.Entity<User_Moodle>().ToTable("User_Moodle");

        }

    }
}