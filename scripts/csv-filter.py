import csv
import string
import random
import json

def id_generator(size=10, chars=string.ascii_uppercase + string.digits):
	return ''.join(random.choice(chars) for _ in range(size))

outerObject = []
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
			d["filename1"] = id_generator() + ".png"
			d["filename2"] = id_generator() + ".png"
			d["filename3"] = id_generator() + ".png"
			d["filename4"] = id_generator() + ".png"
			d["filename5"] = id_generator() + ".png"
			outerObject[str(counter)] = d
			counter += 1
		if(row[1] == "151"):
			break;

y = json.dumps(outerObject)

# the result is a JSON string:
print(outerObject) 