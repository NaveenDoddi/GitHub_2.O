
var user = window.location.href.split('=')[1]

if(user == "null" || user == null){
  var user1 = prompt("your GITHUB id", "naveendoddi");
  window.location.href = window.location.href+"?user=" + user1
}

function visit(user){
  console.log(user.target)
  var value = user.target.getElementsByTagName("h5")[0].innerText
  var currentUrl = window.location.href.split("?")[0]
  window.location.href = currentUrl+"?user=" + value
  
    
}


// for sumanth


function go(){
  var value = document.getElementById("newUser").value
  var currentUrl = window.location.href.split("?")[0]
  window.location.href = currentUrl+"?user=" + value
  
}

(function Profile(){
    
    // var user = "naveendoddi"
    document.getElementById("profile_link").href = "https://www.github.com/"+user
    document.getElementById("contribution_link").href  = "https://github-contribution-graph-example.vercel.app/?user_name="+user
    document.getElementById("contributions_pic").src="https://ghchart.rshah.org/"+user

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
}())

let ReposResponse = false

function Repos(){
  // var user = "naveendoddi"
    
    if(!ReposResponse){
      ReposResponse = true;

      fetch("https://api.github.com/users/"+user+"/repos")
      .then(response => response.json())
      .then((data)=> {
        document.getElementById("reposBNum").innerText = data.length
        data.map((repo)=> {

          var div1 = document.createElement("div")
          div1.className = "col-10 col-sm-6 col-lg-4"

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

          var colorArray = ["243, 102, 51","253, 218, 13","101, 53, 135","34,139,34"]
          div2.style.background = "rgb("+colorArray[random]+")"

          var div3 = document.createElement("div")
          div3.className = "card-body"

          var h6 = document.createElement("h6")
          h6.innerText = repo.default_branch
          var span = document.createElement("span")
          span.innerText = repo.language
          h6.append(span)

          var h4 = document.createElement("h4")
          h4.innerText = repo.name
          h4.style.fontWeight = "900"
          h4.className = "text-center m-4"

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
          div3.append(h6, h4, p1, p2, div4)
          div2.append(div3)
          div1.append(div2)
          document.getElementById("appendReposetries").append(div1)
          document.getElementById("reposLoading").style.display = 'none'

          })
      })

    }

}

let followersResponse = false
function Followers(){
    
    // var user = "naveendoddi"
    if(!followersResponse){

      followersResponse = true

      fetch("https://api.github.com/users/"+user+"/followers")
      .then(response => response.json())
      .then((data)=> {
        document.getElementById("followersBNum").innerText = data.length
          data.map((user)=> {
            var div1 = document.createElement("div")
            div1.className = "col-10 col-sm-6 col-lg-4"
            div1.addEventListener("click", visit)

            var div2 = document.createElement("div")
            div2.className = "card hover-img btn followersCard"
            // div2.addEventListener("click", visit)

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
            document.getElementById("followersLoading").style.display = 'none'

          })
      })
    
    }
    
}

let followingResponse = false;
function Following(){
    
    // var user = "naveendoddi"
    if(!followingResponse){

      followingResponse = true;
      
      fetch("https://api.github.com/users/"+user+"/following")
      .then(response => response.json())
      .then((data)=> {
        document.getElementById("followingBNum").innerText = data.length
          data.map((user)=> {
            var div1 = document.createElement("div")
            div1.className = "col-10 col-sm-6 col-lg-4"
            div1.addEventListener("click", visit)

            var div2 = document.createElement("div")
            div2.className = "card hover-img btn followingCard"
            // div2.addEventListener("click", visit)

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
            document.getElementById("followingLoading").style.display = 'none'
          })
      })

    }
    
}

function searchFollowing(){
  var input = document.getElementById("inputFollowing").value.toUpperCase()
  var maindiv = document.getElementById("appendFollowing")
  var myUl = maindiv.getElementsByClassName("col-10 col-sm-6 col-lg-4")
  for(let i = 0; i < myUl.length; i++){
    var nameTag = myUl[i].innerText
    if (nameTag.toUpperCase().indexOf(input) > -1) {
        myUl[i].style.display = "";
    } else {
        myUl[i].style.display = "none";
    }

  }
  
}

function searchFollowers(){
  var input = document.getElementById("inputFollowers").value.toUpperCase()
  var maindiv = document.getElementById("appendFollowers")
  var myUl = maindiv.getElementsByClassName("col-10 col-sm-6 col-lg-4")
  for(let i = 0; i < myUl.length; i++){
    var nameTag = myUl[i].innerText
    if (nameTag.toUpperCase().indexOf(input) > -1) {
        myUl[i].style.display = "";
    } else {
        myUl[i].style.display = "none";
    }

  }
  
}

function searchRepos(){
  var input = document.getElementById("inputRepos").value.toUpperCase()
  var maindiv = document.getElementById("appendReposetries")
  var myUl = maindiv.getElementsByClassName("col-10 col-sm-6 col-lg-4")
  for(let i = 0; i < myUl.length; i++){
    var nameTag = myUl[i].getElementsByTagName("h4")[0].innerText
    if (nameTag.toUpperCase().indexOf(input) > -1) {
        myUl[i].style.display = "";
    } else {
        myUl[i].style.display = "none";
    }

  }
  
}

// Profile()

// const url = 'https://neutrinoapi-qr-code.p.rapidapi.com/qr-code';
// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/x-www-form-urlencoded',
// 		'X-RapidAPI-Key': 'f90cbe6df8msh64ea992d6e80c97p1168e5jsn5b36b9b19652',
// 		'X-RapidAPI-Host': 'neutrinoapi-qr-code.p.rapidapi.com'
// 	},
// 	body: new URLSearchParams({
// 		content: 'http://www.neutrinoapi.com',
// 		width: '128',
// 		height: '128',
// 		'fg-color': '#000000',
// 		'bg-color': '#ffffff'
// 	})
// };

// try {
// 	const response =  fetch(url, options);
// 	const result = response.toString();
//   console.log(result)
// } catch (error) {
// 	console.error(error);
// }


// alert(`You are ${age} years old!`);
// alert("continue")



async function running(){
  var commits = []
  await fetch('https://api.github.com/repos/naveendoddi/portFolio/commits')
  .then(response => response.json())
  .then((data)=>{
    data.map((post)=>{
      var object = {
        message: post.commit.message,
        date: post.commit.committer.date,
        mail: post.commit.committer.email,
        numbers: post.stats
      }
      commits.push(object)
    })
    
    
  })
  return commits
}
// running()

async function running2() {
  data.map((post)=>{
    fetch('https://api.github.com/repos/naveendoddi/portFolio/commits/'+post.sha)
    .then(response => response.json())
    .then((data)=>{
      data.map((post)=>{
        var object = {
          message: post.commit.message,
          date: post.commit.committer.date,
          mail: post.commit.committer.email,
          numbers: post.stats
        }
        commits.push(object)
      })
    })
  })
}



function get_repo_details(element){
  var reposetry = element.innerText

  var commits = running()
  console.log(commits)

  var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
  var yValues = [55, 49, 44, 24, 15];
  var barColors = ["red", "green","blue","orange","brown"];
  
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "World Wine Production 2018"
      }
    }
  });

}
