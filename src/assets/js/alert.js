class RenderAlert{

    static renderAlert(message, color){
        const htmlAlert = `<div class="alert alert-${color} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
        </div>`

        $("#alertHolder").html(htmlAlert)
        $("#alertHolder").show()

        const id = window.setTimeout(function(){
            $("#alertHolder").hide()
        }, 3000)

        this.clearAllTimeOut(id)
    }

    static clearAllTimeOut(id){
        while(id--) {
            window.clearTimeout(id) // will do nothing if no timeout with id is present
        }
    }

}
