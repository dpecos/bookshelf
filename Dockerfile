FROM ruby:2.3

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir -p /app
WORKDIR /app

COPY Gemfile ./Gemfile
COPY Gemfile.lock ./Gemfile.lock
RUN gem install bundler && bundle install

COPY . ./
RUN RAILS_ENV=development bundle exec rake assets:precompile

EXPOSE 3000:3000

ENV RAILS_ENV=production
# ENV RAILS_RELATIVE_URL_ROOT=/bookshelf

ENV VIRTUAL_HOST=bookshelf.apps.danielpecos.com

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
#CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
