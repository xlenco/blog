(
    function(){
        fetch("https://fcircle.xlenco.eu.org/randomfriend").then(res => res.json()).then(res => {
            randomfriend_a = document.getElementById("randomfriend_a")
            randomfriend_a.harf = res["link"]
        })
    }
)()
