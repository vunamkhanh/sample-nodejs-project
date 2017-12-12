const express = require('express');
const favicon = require('serve-favicon');
const uncaught = require('uncaught');
const hogan = require('hogan-express');
const http_module = require('http');
const async = require('async');
const app = express();
const http = http_module.Server(app);
app.engine('html', hogan);
app.set('port', (3000));
app.use('/', express.static(__dirname + '/public/'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
const Cosmic = require('cosmicjs');
const helpers = require('./helpers');

// API keys
const bucket_slug = "*";
const read_key = "*";
const config = {
  bucket: {
    slug: bucket_slug,
    read_key: read_key,
  },
}

const partials = {
  header: 'partials/header',
  footer: 'partials/footer',
}

app.use('/', (req, res, next) => {
  res.locals.year = new Date().getFullYear();
  next();
})

// Home
app.get('/', (req, res) => {
  Cosmic.getObjects(config, (err, response) => {
    const cosmic = response;
    if (cosmic.objects.type.posts) {
      cosmic.objects.type.posts.forEach(post => {
        const friendly_date = helpers.friendlyDate(new Date(post.created_at));
        post.friendly_date = friendly_date.month + ' ' + friendly_date.date;
      })
    } else {
      cosmic.no_posts = true;
    }
    res.locals.cosmic = cosmic;
    res.render('index.html', { partials });
  })
})

// Single Post
app.get('/:slug', (req, res) => {
  async.series([
    callback => {
      Cosmic.getObjectsByType(config, { type_slug: 'globals' }, (err, response) => {
        res.locals.cosmic = response;
        return callback();
      })
    },
    callback => {
      Cosmic.getObject(config, { slug: req.params.slug, status: 'all' }, (err, response) => {
        res.locals.current_post = response.object;
		if (!res.locals.current_post) {
          //res.sendStatus(404);
		  res.render('empty.html', { partials });
		}
		const friendly_date = helpers.friendlyDate(new Date(response.object.created));
		res.locals.current_post.friendly_date = friendly_date.month + ' ' + friendly_date.date;
		res.render('post.html', { partials });
      })
    }
  ])
})

// Author Posts
app.get('/author/:slug', (req, res) => {
  Cosmic.getObjects(config, (err, response) => {
    const cosmic = response;
    if (cosmic.objects.type.posts) {
      let author_posts = [];
      cosmic.objects.type.posts.forEach(post => {
        const friendly_date = helpers.friendlyDate(new Date(post.created_at));
        post.friendly_date = friendly_date.month + ' ' + friendly_date.date;
        if (post.metadata.author.slug === req.params.slug) {
          res.locals.author = post.metadata.author;
          author_posts.push(post);
        }
      })
      cosmic.objects.type.posts = author_posts;
    } else {
      cosmic.no_posts = true;
    }
    res.locals.author;
	if (!res.locals.author) {
        //res.sendStatus(404);
		res.render('empty.html', { partials });
	}
    res.locals.cosmic = cosmic;
    res.render('author.html', { partials })
  })
})

// Categories
app.get('/category/:slug', (req, res) => {
  Cosmic.getObjects(config, (err, response) => {
	const cosmic = response;
    if (cosmic.objects.type.posts) {
      let category_posts = [];
      cosmic.objects.type.posts.forEach(post => {
        const friendly_date = helpers.friendlyDate(new Date(post.created_at));
        post.friendly_date = friendly_date.month + ' ' + friendly_date.date;
		for (let i = 0; i < post.metadata.category.length; i++){
			if ( post.metadata.category[i].slug === req.params.slug ) {
			  res.locals.category = post.metadata.category[i];
			  category_posts.push(post);
			}
		}
      })
      cosmic.objects.type.posts = category_posts;
    } else {
      cosmic.no_posts = true;
    }
    res.locals.category;
	if (!res.locals.category) {
        //res.sendStatus(404);
		res.render('empty.html', { partials });
	}
    res.locals.cosmic = cosmic;
    res.render('category.html', { partials });
  })
})

// Error handling
uncaught.start();
uncaught.addListener(function (error) {
	console.log('Uncaught error or rejection: ', error.message);
});

// Run
http.listen(app.get('port'), () => {
  console.log(`Go to https://localhost:${app.get('port')}`);
})

