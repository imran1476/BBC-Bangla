// console.log("ghhj")

// fetch....promise......


/*
const loadCategoryAnc= async ()=>{
     try{
         const response =await fetch("https://news-api-fs.vercel.app/api/categories")
    const data=await response.json()
    console.log(data)
      }
    catch(error){
        console.log(error);
    }
   
}
loadCategoryAnc();*/

const categoryContainer=document.getElementById("category-container");
const newsContainer=document.getElementById("news-container");
const bookmarkContainer=document.getElementById("bookmark-container");

let Bookmarks=[];


const loadCategory =()=>{
   
 fetch("https://news-api-fs.vercel.app/api/categories")
.then(res=>res.json())
.then((data)=>{
   const categories=data.categories;
   displayCategory(categories);
})
.catch(error=>console.log(error))
   
}
const displayCategory=(categories)=>{
categories.forEach(category=>{
 categoryContainer.innerHTML+=`
  <li id="${category.id}" class=" hover:border-b-4 border-red-700 cursor-pointer">${category.title}</li>
      `
    })
    categoryContainer . addEventListener('click',(e)=>{
        const allLi=document.querySelectorAll("li");
        allLi.forEach(li=>{
            li.classList.remove('border-b-4')
        })
        if(e.target.localName === "li"){
            // console.log(e.target.id)
            e.target.classList.add('border-b-4')
            const categoryId=e.target.id;
            loadNewsByCategory(categoryId);
        }
        
    })
}
const loadNewsByCategory=(categoryId)=>{
fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
.then((res)=>res.json())
.then((data)=>{
    const articles =data.articles;
// console.log(news)
  displayNewsByCategory(articles)
})
.catch(error=>console.log(error))

}

const displayNewsByCategory=(articles)=>{
    newsContainer.innerHTML=" ";
    articles.forEach(article => {
        // console.log(article)
        newsContainer.innerHTML+=`

        
    <div class="border border-gray-300 rounded-lg p-3">
    <div>
   
     <img src="${article.image.srcset[5].url}"/>
    </div>
        <div id="${article.id}">
        <h1 class="font-extrabold text-lg">${article.title}</h1>
          <p class="mt-2">${article.time}</p>
          <button class="btn">Bookmark</button>
        </div>
    </div>
  

        `
    })
}

newsContainer.addEventListener("click",(e)=>{
    // console.log(e.target.innerText)
    if(e.target.innerText==="Bookmark"){

handleBookMarks(e);
    }

    
})

const handleBookMarks=(e)=>{
    //console.log(e.target.parentNode.children[0].innerText)
    const title=e.target.parentNode.children[0].innerText;
    const id=e.target.parentNode.id;
   // console.log(id)
    Bookmarks.push({
        title:title,
        id:id
    })
  displayBookmarks(Bookmarks)
}

const displayBookmarks=(Bookmarks)=>{
    bookmarkContainer.innerHTML=" ";
    Bookmarks.forEach(Bookmark=>{
        bookmarkContainer.innerHTML+=`
        
 <div class="border p-2 my-2">
    <h1>${Bookmark.title}</h1>
  </div>

        `
    })

}
loadCategory();
loadNewsByCategory("main");
