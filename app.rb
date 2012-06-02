#!/usr/bin/env ruby

# Initialize the $LOAD_PATH.
__DIR__ = File.dirname(__FILE__)
Dir[__DIR__ + "/vendor/*"].map do |dir| 
  $LOAD_PATH << (File.directory?(lib = dir + "/lib") ? lib : dir)
end

require 'sinatra'
require 'open-uri'
require 'cgi'

get '/' do
  erb :index
end

get '/builder' do
  File.read(__DIR__ + '/views/builder.html')
end

get '/config' do
  content_type 'text/javascript'
  path = params.has_key?('url') && params['url'] =~ %r[^https?://] ? '/jsonp' : '/config.json'
  call! env.merge("PATH_INFO" => path)
end

get '/:json.json' do
  content_type 'text/javascript'
  (params['callback'] || '') + "(#{File.read(__DIR__ + "/" + params['json'] + ".json")})"
end

get '/jsonp' do
  content_type 'text/javascript'
  (params['callback'] || '') + "(#{ URI.parse(params['url']).open.read })"
end

get '/aggregate' do
  content_type 'text/javascript'
  (params['callback'] || '') + "({#{ params['url'].map { |k,v| "#{k.inspect}: #{ URI.parse(v).open.read }" }.join(',') }})"
end

def params_to_json
  "{#{ params.map { |k,v| k.inspect + ': ' + (v.nil? ? 'null' : v.inspect) }.join(', ') }}"
end