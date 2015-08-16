# CSV test data generator

This is command line tool test data generator project based on online solution http://www.convertcsv.com/generate-test-data.htm.

When you generate test data online at http://www.convertcsv.com/generate-test-data.htm your browser can only generate up to 50-100K rows, then it hangs. This tool is a good alternative if you want to generate MILLIONS test data rows, using the same definition syntax as used in online web service.

##Usage:

```node generator.js COLUMNS_DEFINITION NUMBER_OF_ROWS OUT_FILE```

`COLUMNS_DEFINITION` - columns definition from http://www.convertcsv.com/generate-test-data.htm (or see below "Allowed Keywords")

`NUMBER_OF_ROWS` - number of rows to generate

`OUT_FILE` - output file path

###Usage example:

```node generator.js "email,first,last,age,street,city,state,zip,digid,date(3),latitude,longitude,pick(RED|BLUE|YELLOW|GREEN|WHITE),string" 10000 out1.csv```


##Allowed Keywords

Keyword:			Description

age:			person's age 1 to 120

alpha
alpha(n):			string of letters a to z mixed case
and if n specified then exactly n length long, i.e. alpha(5)

birthday:			date of birth in mm/dd/yyyy format or birthday(2) for dd/mm/yyyy

bool:			true or false

char:			1 single character of a letter or digits or !@#$%^&*()

city:			cities

ccnumber:			Credit Card Number

date
date(2)
or date(3)
or date(4):			date in mm/dd/yyyy format or

date(2) for dd/mm/yyyy 
or date(3) for yyyy/mm/dd 
or date(4) for yyyymmdd
digit
digit(n):			digit - 5-20 digits

digits(n) where n is a number will generate a string exactly that long, i.e. digit(5) 
See also: integer,float,natural, seq

dollar:			Dollar amount in format of $99999.99

domain:			domain name

email:			dummy email address

first:			First name

float:			Floating/Real number with at most 4 digits to right of decimal 
See also: integer,natural,seq,digit

gender:			Male or Female

integer:			Integer value - includes negatives. 
See also: natural,float,seq,digit

last:			Last name

latitude:			Latitude

longitude:			Longitude

mi:			middle initial - 1 letter

name:			full person's name

natural
natural(n):			Integer value 0 or above, or

natural(n) where n is maximum integer value 
See also: integer,float,seq,digit

paragraph:			paragraph of words - 3 to 7 sentences

phone:			US phone number 999-999-9999

pick(pick1|pick2|...):			choose one of choices separated by |

postal:			Canadian postal (see also province)

province:			Canadian pronvince (see also postal)

seq
seq(n):			numeric integer sequence starting at 1 or n and incremented by 1 

seq(n) - sequence starts at integer n, i.e. seq(1000)

sentence:			sentence words - 12 to 18 words

state:			state

street:			street address

string
string(n):			random string value of letters,digits, and !@#$%^&*()

string(n) where n is length.
word:			words - 5-6 letters

yn:			Y or N

zip:			5 digit US zip code

zip9:			9 digit US zip code in 99999-9999 format