using System.ComponentModel.DataAnnotations;

namespace AngularApp3.Server
{
    public class TodoItem
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = "";

        public bool IsDone { get; set; }
    }
}