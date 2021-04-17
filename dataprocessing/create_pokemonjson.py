import csv
import string
import random
import json

def id_generator(size=15, chars=string.ascii_uppercase + string.digits):
	return ''.join(random.choice(chars) for _ in range(size))

outerObject = {}
with open('pokedex.csv', newline='') as csvfile:
	spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
	counter = 1
	next(spamreader)
	for row in spamreader:
		d = {}
		if( "Mega "  not in row[2] and "Alola" not in row[2] and "Galarian" not in row[2] 
		and "Partner" not in row[2] and "Form" not in row[2] and "Primal" not in row[2] and " Cloak" not in row[2]
		and " Rotom" not in row[2] and " Mode" not in row[2] and "Ash-" not in row[2] and "Black " not in row[2]
		and "White " not in row[2] and " Female" not in row[2] and " Style" not in row[2] and " Unbound" not in row[2]
		and " Size" not in row[2] and "Own Temp" not in row[2]):
			#d["id"] = counter
			d["generation"] = row[5]
			pokenames = {}
			pokenames["name_en"] = row[2]
			pokenames["name_de"] = row[3]
			d["pokenames"] = pokenames
			filenames = {}
			filenames["filename"] = id_generator() + ".png"
			filenames["filename1"] = id_generator() + ".png"
			filenames["filename2"] = id_generator() + ".png"
			filenames["filename3"] = id_generator() + ".png"
			filenames["filename4"] = id_generator() + ".png"
			filenames["filename5"] = id_generator() + ".png"
			filenames["filename6"] = id_generator() + ".png"
			filenames["filename7"] = id_generator() + ".png"
			filenames["filename8"] = id_generator() + ".png"
			d["filenames"] = filenames
			outerObject[counter] = d
			counter += 1
		if(row[1] == "890"):
			break

y = json.dumps(outerObject)

with open("pokemon.json", "w") as outfile: 
    outfile.write(y) 