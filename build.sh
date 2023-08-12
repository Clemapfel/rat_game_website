hugo -b="https://clemens-cords.com"
mv public clemens-cords.com
scp -r clemens-cords.com cords@kudu.in-berlin.de:/home/user/cords/websites