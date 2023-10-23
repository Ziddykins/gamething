$(document).ready(function() {
    let query =  new URLSearchParams(location.search);

    if (query.has('failed_login')) {
        gen_toast('error-login-toast', 'danger', 'bi-dash-circle', 'Error', 'Invalid login credentials!');
    } else if (query.has('register_success')) {
        gen_toast('success-register-toast', 'success', 'bi-check', 'Success', 'Account and Character successfully created, you can now log in');
    } else if (query.has('do_register')) {
        document.getElementById('register-tab').click();
        document.getElementById('register-email').value = params.get('email');
        gen_toast('account-not-exist', 'success', 'bi-check', 'Success', 'No account associated with this email, register?');
    } else if (query.has('logged_out')) {
        gen_toast('logged-out', 'success', 'bi-check', 'Logged Out', 'Successfully logged out!');
    } else if (query.has('gooft')) {
        gen_toast('test-popup', 'warning', 'bi-balloon " style="font-size: 72px;"','Warning', '<marquee>Aw snap ya mighta gooft</marquee>');
    } else if (query.has('account_exists')) {
        gen_toast('account-exists', 'danger', 'bi-dash-circle', 'Account Exists', 'An account already exists with that email');
    } else if (query.has('no_login')) {
        gen_toast('error-nologin-toast', 'danger', 'bi-dash-circle', 'Not Logged In', 'Please login first');
    } else if (query.has('contact_form_submitted', '1')) {
        gen_toast('success-contactform-sent', 'success', 'bi-chat-heart-fill', 'Contact Form Sent', 'Thank you for contacting us, we will get back to you as soon as possible');
    } else if (query.has('page', 'profile') && query.has('action', 'pw_reset') && query.has('result', 'fail')) {
        gen_toast('success-changepw-fail', 'danger', 'bi-key', 'Password Mis-has', 'The two passwords do not match; password unchanged');
    } else if (query.has('action', 'pw_reset') && query.has('result', 'pass')) {
        gen_toast('password-changed', 'success', 'bi-key', 'Password Changed', 'Your password has been successfully updated - Please re-login');
    } else if (query.has('verification_failed')) {
        gen_toast('failed-verification', 'danger', 'bi-envelope-slash', 'Verification Failed', 'Account verification failed - check email/code combination');
    }
});
