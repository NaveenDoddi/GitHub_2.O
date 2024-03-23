
function Profile(){
    var user = sessionStorage.getItem("user")
    document.getElementById("profile_link").href = "https://www.github.com/"+user
    document.getElementById("contribution_link").href  = "https://github-contribution-graph-example.vercel.app/?user_name="+user

    fetch("https://api.github.com/users/"+user)
    .then(response => response.json())
    .then((data)=> {
      document.getElementById("Full_name").innerText = data.name
      document.getElementById("bio").innerText = data.bio
      document.getElementById("email").innerText = data.email
      document.getElementById("twitter_username").innerText = data.twitter_username
      document.getElementById("location").innerText = data.location
      document.getElementById("created_at").innerText = data.created_at.split("T")[0]
      document.getElementById("user_name").innerText = data.login
      document.getElementById("profile_pic").src = data.avatar_url
      document.getElementById("reposNum").innerText = data.public_repos
      document.getElementById("followingNum").innerText = data.following
      document.getElementById("followersNum").innerText = data.followers
    })
}
Profile()
function Repos(){
    var user = sessionStorage.getItem("user")
    if(document.getElementById("appendReposetries").innerText = " "){

      fetch("https://api.github.com/users/"+user+"/repos")
      .then(response => response.json())
      .then((data)=> {
        document.getElementById("reposBNum").innerText = data.length
        data.map((repo)=> {

          var div1 = document.createElement("div")
          div1.className = "col-sm-6 col-lg-4"

          var div2 = document.createElement("div")
          div2.className = "card reposCard"

          if(repo.language =="HTML" ){
              var random = 0
          }else if(repo.language == "JavaScript"){
              var random = 1
          }else if(repo.language == "CSS"){
              var random = 2
          }else{
              var random = 3
          }

          var colorArray = ["45deg,#4099ff,#73b4ff","45deg,#40ffb3,#0eb978","45deg,#f39393,#d65555","45deg,#016a1f,#55d65b"]
          div2.style.background = "linear-gradient("+colorArray[random]+")"

          var div3 = document.createElement("div")
          div3.className = "card-body"

          var h6 = document.createElement("h6")
          h6.innerText = repo.default_branch
          var span = document.createElement("span")
          span.innerText = repo.language
          h6.append(span)

          var h2 = document.createElement("h2")
          h2.innerText = repo.name
          h2.className = "text-center m-4"

          var p1 = document.createElement("p")
          p1.innerText = "created_at:"
          p1.style.fontSize = "15px"
          p1.className = "mb-2"
          var span = document.createElement("span")
          span.innerText = repo.created_at.split("T")[0]
          p1.append(span)

          var p2 = document.createElement("p")
          p2.innerText = "updated_at:"
          p2.style.fontSize = "15px"
          var span = document.createElement("span")
          span.innerText = repo.pushed_at.split("T")[0]
          p2.append(span)

          var div4 = document.createElement("div")
          div4.className = "btn-group d-flex justify-content-center"
          var a1 = document.createElement("a")
          a1.href = "https://"+repo.owner.login+".github.io/"+repo.name
          a1.target = "_blank"
          var btn1 = document.createElement("button")
          btn1.className = "btn btn-sm btn-outline-light"
          var i1 = document.createElement("i") 
          i1.className = "fa-solid fa-eye"
          btn1.append(i1)
          a1.append(btn1)

          var a2 = document.createElement("a")
          a2.href = repo.html_url
          a2.target = "_blank"
          var btn2 = document.createElement("button")
          btn2.className = "btn btn-sm btn-light"
          var i2 = document.createElement("i") 
          i2.className = "fa-solid fa-code"
          btn2.append(i2)
          a2.append(btn2)

          div4.append(a1, " ", a2)
          div3.append(h6, h2, p1, p2, div4)
          div2.append(div3)
          div1.append(div2)
          document.getElementById("appendReposetries").append(div1)
          })
      })

    }

}
function Followers(){
    var user = sessionStorage.getItem("user")
    if(document.getElementById("appendFollowers").innerText = " "){
      fetch("https://api.github.com/users/"+user+"/followers")
      .then(response => response.json())
      .then((data)=> {
        document.getElementById("followersBNum").innerText = data.length
          data.map((user)=> {
            var div1 = document.createElement("div")
            div1.className = "col-sm-6 col-lg-4"

            var div2 = document.createElement("div")
            div2.className = "card hover-img btn"
            div2.addEventListener("click", visit)

            var div3 = document.createElement("div")
            div3.className = "card-body p-4 text-center border-bottom"

            var image = document.createElement("img")
            image.src = user.avatar_url
            image.className = "rounded-circle mb-3"
            image.setAttribute("width","80")
            image.setAttribute("height","80")

            var h5 = document.createElement("h5")
            h5.className = "fw-semibold mb-0"
            h5.innerText = user.login

            div3.append(image, h5)
            div2.append(div3)
            div1.append(div2)
            document.getElementById("appendFollowers").append(div1)
          })
      })
    
    }
    
}
function Following(){
    var user = sessionStorage.getItem("user")

    if(document.getElementById("appendFollowing").innerText = " "){
      fetch("https://api.github.com/users/"+user+"/following")
      .then(response => response.json())
      .then((data)=> {
        document.getElementById("followingBNum").innerText = data.length
          data.map((user)=> {
            var div1 = document.createElement("div")
            div1.className = "col-sm-6 col-lg-4"

            var div2 = document.createElement("div")
            div2.className = "card hover-img btn"
            div2.addEventListener("click", visit)

            var div3 = document.createElement("div")
            div3.className = "card-body p-4 text-center border-bottom"

            var image = document.createElement("img")
            image.src = user.avatar_url
            image.className = "rounded-circle mb-3"
            image.setAttribute("width","80")
            image.setAttribute("height","80")

            var h5 = document.createElement("h5")
            h5.className = "fw-semibold mb-0"
            h5.innerText = user.login

            div3.append(image, h5)
            div2.append(div3)
            div1.append(div2)
            document.getElementById("appendFollowing").append(div1)
          })
      })

    }
    
}

function visit(user){
  var name = user.target.getElementsByTagName("h5")[0].innerText
  sessionStorage.setItem("user", name)

  setTimeout(() => {
    window.location.reload()
    
  }, 100);
    
}

// Profile()