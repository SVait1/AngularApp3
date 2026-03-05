using Microsoft.EntityFrameworkCore;

namespace AngularApp3.Server
{
    public class AppDbContext : DbContext
    {
        public required DbSet<TodoItem> Todos { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title)
                      .IsRequired()
                      .HasMaxLength(200);
            });
        }
    }
}