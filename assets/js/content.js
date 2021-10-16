$(function(){
    $.getJSON("./assets/json/content.json", function(data){
        $('#name').html(data.name)
        document.getElementById('bio_description').innerHTML = data.bio.description

        document.getElementById('banner').setAttribute("style", "background-image: url('" + data.banner + "'")
        document.getElementById('email').innerHTML = data.bio.email
        document.getElementById("email").setAttribute("href", "mailto:" + data.bio.email)
        document.getElementById("phone").innerHTML = data.bio.phone

        document.getElementById("twitter").setAttribute("href", "https://twitter.com/" + data.social.twitter)


        Object.values(data.highlights).forEach(val => {
            $.getJSON("./assets/json/" + val.model + ".json", function(config){
                var tree    = document.createDocumentFragment()
                var section = document.createElement("section")
                var article = document.createElement("article")
                var content = document.createElement("div")
                var title   = document.createElement("h3")
                var descrip = document.createElement("p")
                var modview = document.createElement("model-viewer")
                var progbar = document.createElement("div")
                var updtbar = document.createElement("div")
                var descrip = document.createElement("div")


                section.setAttribute("style", "display: flex")
                article.setAttribute("style", "flex: 50%")
                content.setAttribute("style", "flex: 50%")

                modview.setAttribute("src", "./assets/glb/" + val.model + ".glb")
                modview.setAttribute("ar-modes", "webxr scene-viewer quick-look")
                modview.setAttribute("shadow-intensity", "1")
                modview.setAttribute("ar", "")
                modview.setAttribute("camera-controls", "")
                modview.setAttribute("auto-rotate", "")
                modview.setAttribute("style", "height: 500px; width: 500px")

                progbar.setAttribute("class", "progress-bar hide")
                progbar.setAttribute("slot", "progress-bar")

                updtbar.setAttribute("class", "update-bar")

                title.innerHTML = config.title
                descrip.innerHTML = config.description


                tree.appendChild(document.createElement("hr"))
                tree.appendChild(section)
                section.appendChild(article)
                article.appendChild(modview)
                article.appendChild(progbar)
                article.appendChild(updtbar)
                section.appendChild(content)
                content.appendChild(title)
                content.appendChild(descrip)
                Object.values(config.categories).forEach(val1 => {
                    var chip = document.createElement("span")
                    var text = document.createElement("span")

                    chip.setAttribute("class", "mdl-chip")
                    text.setAttribute("class", "mdl-chip__text")

                    text.innerHTML = val1.tag

                    content.appendChild(chip)
                    chip.appendChild(text)
                })

                document.getElementById("model-highlights").appendChild(tree)
            })
        })
    })
})