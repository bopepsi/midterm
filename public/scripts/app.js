$(document).ready(function () {
  $(".copybutton").mousedown(function () {
    let copyText = $(this).val();
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText);
  });

  $(".username-pswd-info-password").mouseover(function () {
    $(this)
      .closest("form")
      .find(".username-pswd-info-password")
      .attr("type", "text");
  });

  $(".username-pswd-info-password").mouseout(function () {
    $(this)
      .closest("form")
      .find(".username-pswd-info-password")
      .attr("type", "password");
  });

  $(".list_webURL_password").mouseover(function () {
    $(this)
      .attr("type", "text");
  });

  $(".list_webURL_password").mouseout(function () {
    $(this)
      .attr("type", "password");
  });



  const checkForm = function () {
    $("#lowercase").val($("#lowercase").is(":checked") ? 1 : 0);
    $("#uppercase").val($("#uppercase").is(":checked") ? 1 : 0);
    $("#number").val($("#number").is(":checked") ? 1 : 0);
    $("#specialchar").val($("#specialchar").is(":checked") ? 1 : 0);
    const $lowercase = Number($("#lowercase").val());
    const $uppercase = Number($("#uppercase").val());
    const $numbers = Number($("#number").val());
    const $special = Number($("#specialchar").val());


    if ($("#passwordlength").val() <= 6 || $("#passwordlength").val() >= 48 || $("#passwordlength").val().length === 0) {
      $("#disabledsubmit").prop("disabled", true);
      $("#disabledsubmit").css("z-index", "-10");
    }
    if ($("#website_url").val().length === 0) {
      $("#disabledsubmit").prop("disabled", true);
      $("#disabledsubmit").css("z-index", "-10");
    }
    if (!$("#user_email").val().includes('@')) {
      $("#disabledsubmit").prop("disabled", true);
      $("#disabledsubmit").css("z-index", "-10");
    }
    if ($lowercase === 0 && $uppercase === 0 && $numbers === 0 && $special === 0) {
      $("#disabledsubmit").prop("disabled", true);
      $("#disabledsubmit").css("z-index", "-10");
    }
    if (
      (
        $("#passwordlength").val() >= 6 &&
        $("#passwordlength").val() <= 48 &&
        $("#website_url").val().length > 0 &&
        $("#user_email").val().includes('@')
      ) &&
      ($lowercase > 0 || $uppercase > 0 || $numbers > 0 || $special > 0)
    ) {
      $("#disabledsubmit").prop("disabled", false);
      $("#disabledsubmit").css("z-index", "10");
    }

  };

  $(".form-check-input").click(checkForm);
  $(".responsive-input").keyup(checkForm);

});