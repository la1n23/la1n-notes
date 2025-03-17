use v5.30;

`seq -w 0 9999 > otp.txt`;
open my $f, '<', 'otp.txt';
my @b = <$f>;

my @a = map { chomp; "\"$_\"," } @b;
chop $a[-1];
print "[";
print $_ for @a;
print "]";


