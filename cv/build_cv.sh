rm cv.pdf
cd source
lualatex cv.tex
lualatex cv.tex
cd ..
cp -l source/cv.pdf ./
xdg-open cv.pdf
