using System;
using omar;

class Program
{
    public static void Main(string[] args)
    {
        Hash hash= new Hash();
        // hash.Hash32("This is Original Text");
        // hash.Hash32("this is Original Text");
        hash.Hash64("this is Original Text");
        hash.Hash64("This is Original Text");
    }
}
