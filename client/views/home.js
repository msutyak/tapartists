Template.home.onCreated( function() {
    //toggles 'thank you' on home template for contact
    this.showForm = new ReactiveVar( true );
});

Template.home.helpers({
  
  //toggles 'thank you' on inquiry template
  showForm: function () {
    return Template.instance().showForm.get();
  }

});

Template.home.onRendered(function(){

    $('#request-form').validate({
        rules: {
            email: {
                required: true,
                email: true,
                emailUnique: true,
                minlength: 3,
                maxlength: 255
            }
        },
        messages: {
            email: {
                required: "Please enter an email address so we can reach you.",
                email: "You've entered an invalid email address.",
                minlength: "Your email must be at least {0} characters.",
                emailUnique: "That email has already been submitted.  Please enter a unique email!"
            },
        }
    });
});

Template.home.onDestroyed(function(){

});

Template.home.events({
    'submit form': function(event, template) {
        event.preventDefault();
        var $form = template.$('#request-form');         

            if ($form.valid()) {

                var email = $("#email").val();

                UserList.insert({
                    email: email
                });

                template.showForm.set( false );
                location.href = '#one';
            }
        
            else {
                $('#no-choice-error').removeClass('hidden');
            }
        //window.scroll(0,0);

        },
    
});

