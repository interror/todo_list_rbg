// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() { 
$('div.block').css("opacity", "0"); 
$('tbody.background, div.background').hover(function() {
$('div.block', this).stop().fadeTo(0, 1);},
function() { 
$('div.block', this).stop().fadeTo(0, 0); 
}); 
});


$(function() {

  var projects = $('.projects_container');

  var delete_project = function(event, data, status, xhr) {
    $(this).closest('.task_container').remove();
  };

  var delete_task = function(event, data, status, xhr) {
    $(this).closest('.task').remove();
  };

  $.fn.make_editable = function(){
    this.editable({
      ajaxOptions: {
          type: 'put'
       },
      params: function(params) {
      var data = {};
      data['name'] = params.value
      return data;
      },
      send: "always",
      type: 'text'
    }); 
    return this;
  };

  var edit_project_name = function(e){
    e.preventDefault();
    e.stopPropagation();
    $(this).closest('.task_container').find('.project_text').make_editable().editable('toggle');
  };

  var edit_task_name = function(e){
    e.preventDefault();
    e.stopPropagation();
    $(this).closest('.task').find('.task_title').make_editable().editable('toggle');
  };

  var add_new_task = function(event, data, status, xhr) {
    var new_task_form = $(this);
      new_task_form.closest('.task_container').find('.tasks_form').prepend(data);
      new_task_form.find('input[type="text"]').val("").blur();
      new_task_form.find('input[type="submit"]').blur();
        $('div.block').css("opacity", "0"); 
        $('tbody.background, div.background').hover(function() {
        $('div.block', this).stop().fadeTo(0, 1);},
          function() { 
            $('div.block', this).stop().fadeTo(0, 0); 
          }); 
    event.stopPropagation();
  };

  $('#follow').on('ajax:success', function(event, data, status, xhr) {
    var new_project_form = $(this);
    projects.append(data);
      $('div.block').css("opacity", "0"); 
      $('tbody.background, div.background').hover(function() {
      $('div.block', this).stop().fadeTo(0, 1);},
        function() { 
          $('div.block', this).stop().fadeTo(0, 0); 
      });
  $(window).scrollTop($('#end').position().top);     
  });

  var checkbox_ok = function(e){
    e.preventDefault();
    var id = $(this).data('id');
    $.ajax({
      context: this,
      type: 'put',
      url: 'task/'+id+'/checkbox',
      success: function(){
        this.checked = !this.checked;
        $(this).closest('.task').toggleClass('put_ok');
      }
    });
  };

  var deadline = function() {
    $(this).editable({
      format: 'yyyy-mm-dd',
      viewformat: 'dd/mm/yyyy',
      datepicker: {
        weekStart: 1
      },
      ajaxOptions: {
        type: 'put'
      },
      params: function(params) {
        var data= {};
        data['deadline'] = params.value;
        return data;
      },
      send: "always"
    });
  };

  var move_higher = function(){
    var task = $(this).closest('.task');
    task.insertBefore(task.prev());
  };

  var move_lower = function(){
    var task = $(this).closest('.task');
    task.insertAfter(task.next());
  };


  projects.on('ajax:success', '.delete_project', delete_project)
          .on('ajax:success', '.delete_task', delete_task)
          .on('click', '.edit_project_link', edit_project_name)
          .on('click', '.edit_task_link', edit_task_name)
          .on('ajax:success', '.new_task', add_new_task)
          .on('click', '.status_ok', checkbox_ok)
          .on('click', '.take_deadline', deadline)
          .on('ajax:success', '.up', move_higher)
          .on('ajax:success', '.down', move_lower)
});