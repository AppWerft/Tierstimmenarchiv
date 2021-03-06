Tierstimmenarchiv
=================

With this  TitaniumApp the user can surf in side the tierstimmenarchiv.de (Naturkundemuseum Berlin)

![](https://raw.githubusercontent.com/AppWerft/Tierstimmenarchiv/master/screens/Screenshot_2016-01-05-20-38-59.png)
![](https://raw.githubusercontent.com/AppWerft/Tierstimmenarchiv/master/screens/Screenshot_2016-01-05-20-39-25.png)
![](https://raw.githubusercontent.com/AppWerft/Tierstimmenarchiv/master/screens/Screenshot_2016-01-05-20-39-49.png)


Data model
----------

On (web-)server is a script. This script generates a sqlite file with the following structure:

~~~
table "recordings"
- species 
- subspecies,
- locality,
- administrative_area,
- country,
- state,
- scenic_area,
- latitude,
- longitude,
- altitude,
- recording_date,
- recording_time,
- habitat
- sex,
- age,
- specimen,
- visual_identification,
- description,
- sound_type,
- background_species,
- filename,
- unique_identifier,
- notes
~~~
Every dataset has a size of ca. 300 Bytes. If we have 18000 recordings the whole table has ca. 5.5 Mbytes. If the transfer is gzipped, then 500kBytes are runs thrue net.
On start of app we test with filesize or etag if a new version is available.

To realize a taxo-tree we need the following tables:
~~~

table "taxonomy_species"
- id 
- latin_name
- i18n_name
- language
- genus_id

table "taxonomy_genus"
- id 
- latin_name
- i18n_name
- language
- family_id

table "taxonomy_family"
- id 
- latin_name
- i18n_name
- language
- order_id

table "taxonomy_order"
- id 
- latin_name
- i18n_name
- language
- class_id

table "taxonomy_class"
- id 
- latin_name
- i18n_name
- language
- phylum_id

table "taxonomy_phylum"
- id 
- latin_name
- i18n_name
- language
- kingdom_id

table "taxonomy_kingdom"
- id 
- latin_name
- i18n_name
- language
- domain_id

table "taxonomy_domain"
- id 
- latin_name
- i18n_name
- language
~~~


The app will sync with this remote sqlite. 


Spectrogramms
-------------

The nice spectrograms are generated with sox. 

~~~
wget -r -l0 -erobots=off -R.mp3 http://www.tierstimmenarchiv.de/recordings
for fn in *.mp3 ; do lame --decode $fn $fn.wav ; done
mkdir ./spectrograms
for fn in *.wav ; do sox $fn -n spectrogram  -r  -o  spectrograms/$fn.png ; done
for fn in spectrograms/*.png ; do convert $fn  spectrograms/$fn.jpg ; done
tar -zcvf spectrograms.tar.gz ./spectrograms

~~~