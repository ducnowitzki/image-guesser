import json
from PIL import Image
outerObject = {}
with open('pokemon.json') as f:
  outerObject = json.load(f)

# the result is a JSON string:
steps = [0,2, 4,6,8,10,12,24,32]

for i in range(1,891):
	print("current step:" + str(i) + "/890" )
	og_im = Image.open("./modified_images/" + str(i) + ".png")
	og_im = og_im.resize((256,256), resample=Image.BOX)
	og_im.save("../static/obf/"  +  outerObject[str(i)]["filenames"]["filename"])
	for j in range(1,9):
		size = steps[j], steps[j]
		im = Image.open("./modified_images/" + str(i) + ".png")
		im_resized = im.resize((size), resample=Image.BOX)
		im_upper = im_resized.resize((256,256), resample=Image.BOX)
		im_upper.save("../static/obf/"  +  outerObject[str(i)]["filenames"]["filename" + str(j)])

		