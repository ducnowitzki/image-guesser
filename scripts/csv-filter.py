import csv
import string
import random
import json
from PIL import Image

def id_generator(size=10, chars=string.ascii_uppercase + string.digits):
	return ''.join(random.choice(chars) for _ in range(size))

outerObject = {}
with open('pokedex_(Update.04.20).csv', newline='') as csvfile:
	spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
	counter = 1
	next(spamreader)
	for row in spamreader:
		d = {}
		if( "Mega"  not in row[2] and "Alola" not in row[2] and "Galarian" not in row[2] and "Partner" not in row[2]):
			#d["id"] = counter
			d["name_en"] = row[2]
			d["name_de"] = row[3]
			d["filename"] = str(counter) + ".png"
			d["filename1"] = id_generator() + ".png"
			d["filename2"] = id_generator() + ".png"
			d["filename3"] = id_generator() + ".png"
			d["filename4"] = id_generator() + ".png"
			d["filename5"] = id_generator() + ".png"
			d["filename6"] = id_generator() + ".png"
			d["filename7"] = id_generator() + ".png"
			
			outerObject[counter] = d
			counter += 1
		if(row[1] == "151"):
			break;

y = json.dumps(outerObject)

with open("result.json", "w") as outfile: 
    outfile.write(y) 

# the result is a JSON string:
steps = [0,3, 4,5,6,8,12,22]

for i in range(1,152):
	for j in range(1,8):
		size = steps[j], steps[j]
		im = Image.open("../media/1stgen/" + str(i) + ".png")
		#im.thumbnail(size)
		im_resized = im.resize((size), resample=Image.NEAREST)
		im_upper = im_resized.resize((256,256), resample=Image.NEAREST)
		im_upper.save("../media/stuff/"  +  outerObject[i]["filename" + str(j)])

		
