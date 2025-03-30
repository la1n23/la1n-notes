```bash
# argc
echo $e
# argv[0], argv[1]
$0 $1 $2 $3
# argv
$@
# current process ID
$$
# exit status
$?

# arrays
list=(test foo bar)
echo ${list[0]}

# string comparsion
# ==, !=, -z - is string empty, -n - is string not null
# <, >       - works only withing [[ string > string2 ]]

# integer compasion
# -eq, -ne, -lt, -le, -gt, -ge

# file operators
# -e - exists
# -f - is a file
# -d - is a directory
# -L - is a symbolic link
# -N - if was modified after it was read
# -O - if current user owns file
# -G - if gorup id matches current user's
# -s - if size > 0
# -r - has read permissions
# -w - hash write permissions
# -x - execute permissions

# boolean compations
# [[ -z $1 ]]                - is false
# [[ $# > 1 ]]               - true if $# > 1
# [[ -e "$1" && -r "$1" ]]   - and operator
# [[ ! -e "$1" ]]            - not operator
# [[ -e "$1" && ! -r "$1" ]] - not operator

# split by space and take second element
echo "foo bar" | awk '{print $2}'
bar
# same but using cut
echo "one two three four five" | cut -d" " -f4
four

# no \n
echo -e
read -p
# append to file
echo "test" | tee -a file

# loops
for v in {1..28}; do
	echo $v
done

for v in 1 2 3 4; do
	echo $v
done

for s in str1 str2; do
	echo $s
done

for s in "str1 str2"; do
	echo $s
done

c=0
while [ $c -lt 10 ]; do
	echo $c
	((c++))
done

# case
case $opt in
	"1") network_range ;;
	"2") ping_host ;;
	"3") network_range && ping_host ;;
	"*") exit 0 ;;
esac

# functions
function fname {
	echo $1 $2 $3 ${10}
}
fname() {
	echo $1 $2 $3 ${10}
}
# return codes
1 	    General errors
2 	    Misuse of shell builtins
126 	Command invoked cannot execute
127 	Command not found
128 	Invalid argument to exit
128+n 	Fatal error signal "n"
130 	Script terminated by Control-C
255\* 	Exit status out of range

# debug
bash -vx script.sh
```