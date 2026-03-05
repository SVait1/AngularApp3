namespace AngularApp3.Server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTodos()
        {
            var todos = await _context.Todos
                .AsNoTracking()
                .ToListAsync();

            return Ok(todos);
        }

        public class CreateTodoDto
        {
            public string Title { get; set; } = "";
        }

        [HttpPost]
        public async Task<IActionResult> AddTodo([FromBody] CreateTodoDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest("Title is required");

            var item = new TodoItem
            {
                Title = dto.Title,
                IsDone = false
            };

            _context.Todos.Add(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }

        public class UpdateTodoDto
        {
            public string Title { get; set; } = "";
            public bool IsDone { get; set; }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] UpdateTodoDto dto)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null) return NotFound();

            todo.Title = dto.Title;
            todo.IsDone = dto.IsDone;

            await _context.SaveChangesAsync();
            return Ok(todo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null) return NotFound();

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}