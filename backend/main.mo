import Float "mo:core/Float";

actor {
  type Shape = {
    #square;
    #rectangle : RectangleDimensions;
  };

  type RectangleDimensions = {
    width : Float;
  };

  public shared ({ caller }) func calculatePerimeter(wheelCircumference : Float, rotationCount : Float) : async Float {
    wheelCircumference * rotationCount;
  };

  public shared ({ caller }) func calculateRectangleArea(length : Float, width : Float) : async Float {
    length * width;
  };

  public shared ({ caller }) func calculateSquareArea(side : Float) : async Float {
    side * side;
  };

  public shared ({ caller }) func calculateIrregularArea(triangleDimensions : [(Float, Float)]) : async Float {
    var totalArea = 0.0;
    for ((base, height) in triangleDimensions.values()) {
      totalArea += base * height / 2.0;
    };
    totalArea;
  };

  public shared ({ caller }) func areaFromRotations(wheelCircumference : Float, rotationCount : Float, shape : Shape) : async Float {
    let length = wheelCircumference * rotationCount;
    switch (shape) {
      case (#square) { (length / 4.0) * (length / 4.0) };
      case (#rectangle { width }) {
        let perimeter = length;
        let rectangleLength = (perimeter - 2.0 * width) / 2.0;
        rectangleLength * width;
      };
    };
  };
};
