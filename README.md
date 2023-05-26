# **3WIP-B2 Backend Project-2**
##  **Bookstore application backend with MVC pattern. Website's end points are:**
---
## Welcome route
- [Website Link](https://bookstore-application.vercel.app)
---
## Common routes
### Registration (post route) ####
- /v1/common/registration [Link](https://bookstore-application.vercel.app/v1/common/registration)
- Need **name, email, phonNumber, password** from **req.body**
### Login (get route) ####
- /v1/common/login [Link](https://bookstore-application.vercel.app/v1/common/login)
- Need **email, password** from **req.body**
---
## Public routes
#### Need (user or admin)  **jwt** from **req.headers.authorization**
### Search books (get route) ####
- /v1/public/search-books [Link](https://bookstore-application.vercel.app/v1/public/search-books)
- Need **title, author, ISBN** from **req.body**
### Filter books by category (get route) ####
- /v1/public/search-with-category/:category [Link](https://bookstore-application.vercel.app/v1/public/search-with-category/:category)
- Need **category** from **req.params**
### Add to cart (post route) ####
- /v1/public/add-to-cart [Link](https://bookstore-application.vercel.app/v1/public/add-to-cart)
- Need **bookId, quantity** from **req.body**
### Delete item from cart (delete route) ####
- /v1/public/delete-item-from-cart [Link](https://bookstore-application.vercel.app/v1/public/delete-item-from-cart)
- Need **bookId** from **req.body**
### Checkout (post route) ####
- /v1/public/checkout [Link](https://bookstore-application.vercel.app/v1/public/checkout)
- Need **address, city, postCode** from **req.body**
### Payment (post route) ####
- /v1/public/payment [Link](https://bookstore-application.vercel.app/v1/public/payment)
- Need **orderId, totalAmount** from **req.body**
### Customer order history (get route) ####
- /v1/public/history [Link](https://bookstore-application.vercel.app/v1/public/history)
### Add book to wish list (post route) ####
- /v1/public/add-book-to-wish-list [Link](https://bookstore-application.vercel.app/v1/public/add-book-to-wish-list)
- Need **bookId** from **req.body**
---
## Secure routes
#### Need (admin)  **jwt** from **req.headers.authorization**
### View all books (get route) ####
- /v1/secure/view-all-books [Link](https://bookstore-application.vercel.app/v1/secure/view-all-books)
### View book by id (get route) ####
- /v1/secure/view-book [Link](https://bookstore-application.vercel.app/v1/secure/view-book)
- Need **bookId** from **req.query**
### Add book (post route) ####
- /v1/secure/add-book [Link](https://bookstore-application.vercel.app/v1/secure/add-book)
- Need **title, author, description, ISBN, coverImageUrl, category, price** from **req.body**
### Edit book (patch route) ####
- /v1/secure/edit-book [Link](https://bookstore-application.vercel.app/v1/secure/edit-book)
- Need **bookId** from **req.query**
- Need **new book data object** from **req.body**
### Delete book (patch route) ####
- /v1/secure/delete-book [Link](https://bookstore-application.vercel.app/v1/secure/delete-book)
- Need **bookId** from **req.query**
---



<!-- ### Admin email: abc@gef.com
### Admin password: 12345 -->