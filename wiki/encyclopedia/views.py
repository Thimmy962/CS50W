from random import choice
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
import markdown
from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

# Convert markdown to html
def mark_to_html(title):
    content = util.get_entry(title)
    converter = markdown.Markdown()
    if content == None:
        return None
    else:
        return converter.convert(content)

def detail(request, title):
    return render(request, 'encyclopedia/detail.html',{
        'entry': mark_to_html(title), 'title': title
    })

def search(request):
    if request.method == 'POST':
        entry = request.POST['q']
        if mark_to_html(entry):
            return HttpResponseRedirect(reverse('encyclopedia:detail', args=(entry,)))
        else:
            recommendation=[]
            for list in util.list_entries():
                if entry.lower() in list.lower():
                    recommendation.append(list)
            return render(request, 'encyclopedia/recommendation.html',{
                "entries": recommendation
            })

    
def randomize(request):
    entry = choice(util.list_entries())
    return HttpResponseRedirect(reverse('encyclopedia:detail', args=(entry,)))

def edit_page(request, title):
    if request.method == 'POST':
        util.save_entry(title, request.POST['content'])
        return HttpResponseRedirect(reverse('encyclopedia:detail', args=(title,)))
    return render(request, 'encyclopedia/edit_page.html',{
        'title': title,
        'entry': util.get_entry(title)
    })


def new_page(request):
    if request.method == 'POST':
        title = request.POST['title']
        content = request.POST['content']
        
        title_exist = util.get_entry(title)
        if title_exist:
            #if title already exist send a message to the user
            return render(request, 'encyclopedia/new.html',{
                    'message': 'Title already exist'
                })
        util.save_entry(title, content)
        return HttpResponseRedirect(reverse('encyclopedia:detail', args=(title,)))
    return render(request, 'encyclopedia/new.html')

