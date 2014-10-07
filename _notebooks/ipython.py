import sys
import os
from urllib2 import quote

"""
Known issues:
    * title includes date
    * watch out for lack of {{self.baseurl}}
"""

"""
BIN_DIR = directory containing jekyll.tpl template
BUILD_DIR = output directory for ipython conversions (.md and folder of any images)
STATIC_DIR = relative url for jekyll images
"""
IPYTHON_BIN_DIR = os.path.abspath(os.environ['IPYTHON_BIN_DIR'])
IPYTHON_BUILD_DIR = os.path.abspath(os.environ['IPYTHON_BUILD_DIR'])
IPYTHON_STATIC_DIR = os.environ['IPYTHON_STATIC_DIR']

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
try:
    f = next(arg.split('.ipynb')[0] for arg in sys.argv if arg.endswith('.ipynb'))
except StopIteration:
    f = None

c = get_config()
c.NbConvertApp.export_format = 'markdown'
c.MarkdownExporter.template_path = [IPYTHON_BIN_DIR]
c.MarkdownExporter.template_file = 'jekyll'
 
def path2support(path):
    """Turn a file path into a URL"""
    parts = path.split(os.path.sep)
    # return '{{ site.baseurl}}' + IPYTHON_STATIC_DIR + '/' + '/'.join(quote(part) for part in parts)
    return '/' + IPYTHON_STATIC_DIR + '/' + '/'.join(quote(part) for part in parts)
 
c.MarkdownExporter.filters = {'path2support': path2support}
 
if f:
    c.NbConvertApp.output_base = f.lower().replace(' ', '-')
    c.FilesWriter.build_directory = IPYTHON_BUILD_DIR
