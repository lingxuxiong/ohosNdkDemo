#include <sstream>
#include <iostream>
    
using namespace std;

int sum(int a, int b)
{
    return a + b;
}

string toString() {

    stringstream ss;

    int density = 0;
    int sourceSize = 0;
    int targetSize = 0;
    int dpi = 0;
    int mode = 0;
    int duplex = 0;
    int idCardType = 0;
    int nup = 0;
    int paperType = 0;

    ss << endl
       << "density:" << density << endl
       << "sourceSize:" << sourceSize << endl
       << "targetSize:" << targetSize << endl
       << "dpi:" << dpi << endl
       << "mode:" << mode << endl
       << "duplex:" << duplex << endl
       << "idCardType:" << idCardType << endl
       << "nup:" << nup << endl
       << "paperType:" << paperType << endl;
    return ss.str();
}