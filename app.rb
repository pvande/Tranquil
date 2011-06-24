#!/usr/bin/env ruby

# Initialize the $LOAD_PATH.
__DIR__ = File.dirname(__FILE__)
Dir[__DIR__ + "/vendor/*"].map do |dir| 
  $LOAD_PATH << (File.directory?(lib = dir + "/lib") ? lib : dir)
end

require 'sinatra'
require 'open-uri'

get '/' do
  params['config'] ||= "config.json"
  erb :index
end

get '/:json.json' do
  content_type 'text/javascript'
  (params['callback'] || '') + "(#{File.read(__DIR__ + "/" + params['json'] + ".json")})"
end

get '/jsonp' do
  content_type 'text/javascript'
  (params['callback'] || '') + "(#{ open(params['url']).read })"
end
