using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Activity
    {
       [Required]
        public Guid Id { get; set; }
        
        public string Title { get; set; }
        [Required]
        public DateTime Date { get; set; }
      
        public string Description { get; set; }
       
        public string Category { get; set; }
      
        public string City { get; set; }
  
        public string Venue { get; set; }
    }
}   