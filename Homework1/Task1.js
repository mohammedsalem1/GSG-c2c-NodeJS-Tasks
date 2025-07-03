                                // Task-1
//  1. Object Literal

//   const Book = {
//     title : "Web Database Design" , 
//     author: "mohamed salem" ,
//     isRead: true , 

//     toggleReadStatus() {
//       return this.isRead = !this.isRead
//     } , 
//     describe() {
//       return `Title:${this.title} by Author: ${this.author} , isRead? ${this.isRead}`
//     }
//   }

// 2. Factory function

 function createBook () {
   const Book = {}
   Book.title = "Web Database Design" 
   Book.author = "mohammed salem" 
   Book.isRead = true  
  
   Book.toggleReadStatus = function() {
      return this.isRead = !this.isRead
    }  
   Book.describe = function() {
      return `Title:${this.title} by Author: ${this.author} , isRead? ${this.isRead}`
    }
   return Book; 
 }

 // 3. Constructor Function

  function CreateBook () {
   this.title = "Web Database Design" 
   this.author = "mohammed salem" 
   this.isRead = true  
  
   this.toggleReadStatus = function() {
      return this.isRead = !this.isRead
    }  
   this.describe = function() {
      return `Title:${this.title} by Author: ${this.author} , isRead? ${this.isRead}`
    }
 }
//  4. Class Function

 class Book {
  constructor(title , author , isRead){
      this.title = title
      this.author = author 
      this.isRead= isRead 
  }
  

    toggleReadStatus() {
      return this.isRead = !this.isRead
    } 
    describe() {
      return `Title:${this.title} by Author: ${this.author} , isRead? ${this.isRead}`
    }
 } 




 