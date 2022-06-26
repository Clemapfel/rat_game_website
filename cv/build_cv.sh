# executed in rat_game_website/cv
rm ../static/cv.pdf
cd source
rm cv.pdf
lualatex cv.tex
lualatex cv.tex
cp cv.pdf ../../static/cv.pdf
xdg-open cv.pdf
echo cv with dummy profile pic was copied to /static
