# Jose-Antonio_LoverBus
Jose Antonio LoverBus is a project of a lover bus.
The website will show a map that where the lover bus is.
Catch up and hold up on it!

### Authors
B06901045 曹林熹：前端設計、前後端架構連結    
B06901141 何俊偉：前後端架構連結、後端伺服器架設     
B06901041 許誠：前端設計、影片剪輯     

![](https://i.imgur.com/DM4C6P3.png)

### Tools

* mapbox-gl
* react-app
* node.js
* graphql-yoga
* Apollo GraphQL
* MongoDB
* Dotenv





### Usage

1. Create an account

   ![](/img/01.png)

2. Create a marker by clicking the map or using the search box on top of the map

   ![](/img/02.png)

3. Input title and description to record your experience or your expectation about a place

   ![](/img/03.png)

4. Create a plan and save locations into plans

   ![](/img/04.png)
   
5. Choose a plan in your plan list

   ![](/img/05.png)

6. Modify your staying time in a place

   ![](/img/06.png)


## Demo 影片

https://www.youtube.com/watch?v=nlLpOqNpUfY

## Deploy Link

https://jose-antonio-lover-bus.herokuapp.com

## 專題製作心得：

這次與組員們花了很多心力做出了這個成品，起初分工的部分明確分出前端與後端，讓兩邊在更新程式碼時效率比較高。到後期由於我們開的功能蠻多的，因此在做 query, mutation, subscribe 時相較困難了一點，因為同一個 js 檔中有很多的東西會改，改前端的同時也要搭配後端，因此在不使用 branch 時常常 merge conflict。最後，這份專題我們都很滿意，因為我們三個都喜愛旅遊，想要自己建立一個 bucket list 出來，能夠克服 graphql 與 apollo 打造自己的網頁實在是很開心！

## .env file 
### JoseAntonioLoverBus/frontend
```
REACT_APP_ACCESS_TOKEM=

```

### JoseAntonioLoverBus/backend
```
MONGO_URL=

```
