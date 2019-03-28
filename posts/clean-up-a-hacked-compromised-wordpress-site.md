---
title: 'Clean Up a Hacked, Compromised WordPress Site'
date: 2019-03-28T20:30:00.000Z
summary: >-
  I've developed several scripts to help automate the process of cleaning up a
  hacked, compromised WordPress site.
tags:
  - post
---
It happens to the best of us. In spite of our efforts to keep our WordPress instances up-to-date, a plugin or theme falls behind and some miscreant uses that to ruin things.

At that point, it's tempting to just remove the bad stuff and move along. However even if a thorough job is done, and WordPress core matches checksums, it's entirely possible for the attacker to waltz right back in unless the WordPress security keys in **wp-config.php** are updated.

The home for this information is truly on the WP [OrbitalStrike GitHub Page](https://github.com/thursby/wp-orbitalstrike) but I'm reproducing it here for convenience.

Since every WordPress installation is different, there's no way to completely automate the process of cleaning up after a compromise, but this doesn't mean we can't sharpen our tools for the manual work.

## Keep the good stuff

It should go without saying that a backup should be made before doing any of this. While part of the process is to try and ensure everything is backed up, that shouldn't be good enough; make another backup.

Note that all of these scripts assume you're running them from the document root of the WordPress installation.
<a href="https://gist.githubusercontent.com/thursby/7395ce457ae6b1fbe49fee6d1e41cd20/raw/3c95ab2000bc9ed8c951d6d89ce5452117acf614/wp-backup.sh">wp-backup.sh"</a>

```bash
#!/bin/bash

tmp_dir=`mktemp -d`
echo Work Directory: $tmp_dir

files_to_keep=("wp-config.php" "wp-content/uploads")

for i in ${files_to_keep[@]}; do
  echo "Copying ${i}"
  cp -R ${i} $tmp_dir  # Replace with mv for speed once it's working right
done

echo "Backing up WordPress Database and saving data"
wp db export $tmp_dir/database.sql
wp core version > $tmp_dir/wp_version.txt
wp plugin list --format=csv > $tmp_dir/wp_plugins.txt
wp theme list --format=csv > $tmp_dir/wp_themes.txt

do_not_compress=".tiff:.gif:.snd:.png:.jpg:.jpeg:.mp3:.tif"

zip --suffixes $do_not_compress -1 -r $tmp_dir/backup.zip -x@"exclude.txt" .

echo "Finished backing up to: $tmp_dir"
```

## Get rid of the hacked, compromised stuff

Now the next step is to delete the WordPress installation. It's at this point you'd need to make sure to keep any extra directories like a downloads folder, or any subdirectories that might contain other web applications. This part is up to you, but should be totally safe because you created that backup previously, right?

## Reinstall From the WordPress Repository

Here comes the cool part. We'll need to read the info in the files we created earlier, and use WP-CLI to reinstall WordPress, themes, and plugins. Care is taken to record and reinstall the correct version. As long as the plugin is published correctly in the WordPress repository, this will result in a nicely working installation.

Of course if you're using plugins or themes that aren't in the repository, you'll need to manually download and reinstall those.

Prior to running this script, there should already be a **wp-config.php** in the directory, and it should be referring to a MySQL user and database that have been created.

<a href="https://gist.githubusercontent.com/thursby/541f415c5751e1d656d67ab177eab9e3/raw/3f3c1ca59d957e6d48460b63a286498b2e09fec5/wp-restore.sh">wp-restore.sh</a>

```bash
#!/bin/bash

source_dir=$1

wp_core_version=`cat "$source_dir/wp_version.txt"`

# Download and extract the WordPress core
wp core download --version=$wp_core_version

# Read the list of themes from the file we created earlier
INPUT=$source_dir/wp_themes.txt
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
while read -r line
do
	theme=`echo $line | awk -F"," '{ print $1 }'`
	isactive=`echo $line | awk -F"," '{ print $2 }'`
	version_number=`echo $line | awk -F"," '{ print $4 }'`
	
	if [ "$isactive" = "active" ]
	then
		isactive="--activate"
	else
		isactive=""
	fi
	if [ "$theme" != "name" ]
	then
		wp theme install $theme --version=$version_number $isactive
	fi
done < $INPUT

# Read the plugins from the file we created earlier
INPUT=$source_dir/wp_plugins.txt
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
while read -r line
do
	plugin=`echo $line | awk -F"," '{ print $1 }'`
	isactive=`echo $line | awk -F"," '{ print $2 }'`
	version_number=`echo $line | awk -F"," '{ print $4 }'`
	
	if [ "$isactive" = "active" ]
	then
		isactive="--activate"
	else
		isactive=""
	fi
	if [ "$plugin" != "name" ]
	then
		wp plugin install $plugin --version=$version_number $isactive
	fi
done < $INPUT

# Copy the wp-config and uploads directories back.
cp $source_dir/wp-config.php .
mkdir wp-content
cp -R $source_dir/uploads wp-content/uploads

# Reset WordPress security keys
# Found on StackOverflow http://stackoverflow.com/a/16389269/6060612
# Not even marked as the correct answer, but this does the trick even with existing keys

find . -name wp-config.php -print | while read line
do
    curl http://api.wordpress.org/secret-key/1.1/salt/ &gt; wp_keys.txt
    sed -i.bak -e '/put your unique phrase here/d' -e \\
    '/AUTH_KEY/d' -e '/SECURE_AUTH_KEY/d' -e '/LOGGED_IN_KEY/d' -e '/NONCE_KEY/d' -e \\
    '/AUTH_SALT/d' -e '/SECURE_AUTH_SALT/d' -e '/LOGGED_IN_SALT/d' -e '/NONCE_SALT/d' $line
    cat wp_keys.txt >> $line
    rm wp_keys.txt
done
```

And there you have it! This should be a working WordPress installation. Note that we dumped the database but didn't do anything with it. The same database is present. This means that for the small percentage of compromises that persist in the database, more work is necessary to get things back into shape.'
