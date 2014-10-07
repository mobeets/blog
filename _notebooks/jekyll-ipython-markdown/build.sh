#!/bin/bash
#
# Converts .ipynb file to .md file and data folder
#   .md -> $POSTDIR
#   data folder -> $STATICDIR
#
# source: http://cscorley.github.io/2014/02/21/blogging-with-ipython-and-jekyll/
#

POSTDIR="_drafts" # final location of .md files, relative to jekyll root
STATICDIR="images/ipython" # final location of image files, relative to jekyll root

BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" # directory containing jekyll.tpl and ipython.py
BUILDDIR="${BINDIR}/../../${STATICDIR}" # full path for data folder
OUTDIR="${BINDIR}/../../${POSTDIR}" # full path for posts folder
export IPYTHON_BIN_DIR=${BINDIR}
export IPYTHON_BUILD_DIR=${BUILDDIR}
export IPYTHON_STATIC_DIR=${STATICDIR}

nbconvert(){
    ipython nbconvert --config ${BINDIR}/ipython.py $1;
        find ${BUILDDIR} -name '*.md' -exec mv {} ${OUTDIR} \;
}
for fname in "$@"
do
    nbconvert "$fname"
done
