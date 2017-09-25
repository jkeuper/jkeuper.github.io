---
title: 'Tricking reflection with ICustomTypeDescriptor Interface'
date: 2017-09-26 00:27
categories: development
tags: .net csharp reflection
featured_image: '/images/posts/vs-reflection.jpg'
lead_text: 'Implementing dynamic properties using the ICustomTypeDescriptor interface to show in a PropertyGrid control?'
published: false
---

In the .NET Framework using reflection was always a bit cool when you needed it
to solve a problem. Of course you have the performance penalty in mind when
using it. Querying objects at runtime and even call properties and execute
methods on that object, that's awesome! But what about having an interface that
answers those queries?


<img src="/images/posts/propertygrid.jpg" 
     alt="Complex propertygrid"
     class="media pull-right img-thumbnail">
The [ICustomTypeDescriptor](https://msdn.microsoft.com/en-us/library/system.componentmodel.icustomtypedescriptor(v=vs.110).aspx)
interface can be used to implement your own way to provide information about
objects. For example show your own properties in the
[.NET PropertyGrid control](https://msdn.microsoft.com/en-us/library/system.windows.forms.propertygrid(v=vs.110).aspx).

## Example
Let's start with a test program. Our program starts with a dictionary, where we
define properties and the values they have. For this test we instantiate our
CustomObject and provide the dictionary. Now, with the use of reflection, we
read all properties and print them on screen.
```cs
void Main()
{
    var values = new Dictionary<string, string>();
    values.Add("Foo", "This is a test!");
    values.Add("Bar", "Foobar!");

    object fooBarObject = new CustomObject(values);

    PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(fooBarObject);
    foreach(PropertyDescriptor prop in properties)
    {
        Console.WriteLine("{0}={1}", prop.Name, prop.GetValue(fooBarObject));
    }
}
```

To make this example work, we implement our CustomObject which implements the
ICustomTypeDescriptor interface. We store the values dictionary, and implement
the GetProperties to create a property descriptor for each entry in the dictionary.
```cs
public class CustomObject : ICustomTypeDescriptor
{
    public Dictionary<string, string> ValuesContainer;
 
    public CustomObject(Dictionary<string, string> values)
    {
        ValuesContainer = values;
    }
 
    public PropertyDescriptorCollection GetProperties(Attribute[] attributes)
    {
        List<PropertyDescriptor> props = new List<PropertyDescriptor>();

        // Make Attribute array
        Attribute[] attrArray = new Attribute[0];

        // Create and add PropertyDescriptors
        foreach (string key in ValuesContainer.Keys)
	{
            CustomPropertyDescriptor pd =
	              new CustomPropertyDescriptor (ValuesContainer, key, attrArray);
            props.Add(pd);
        }
        
        return new PropertyDescriptorCollection(props.ToArray());
   }
   
   public object GetPropertyOwner(PropertyDescriptor pd)
   {
       return this;
   }
   
   PropertyDescriptorCollection System.ComponentModel.ICustomTypeDescriptor.GetProperties()
   {
       return GetProperties(new Attribute[0]);
   }
   
   // All other methods of this interface pass calls directly to TypeDescriptor

```

For each property we have created an instance of a CustomPropertyDescriptor
class. This class describes our property and is responsible for getting and
setting the actual value.
```cs
public class CustomPropertyDescriptor : PropertyDescriptor
{
   public Dictionary<string, string> ValuesContainer;
   
   public CustomPropertyDescriptor(
            Dictionary<string, string> valuesContainer, 
            string name,
            Attribute[] attrs) : base(name, attrs)
   {
       ValuesContainer = valuesContainer;
   }

   public override Type ComponentType
   {
       get { return typeof(CustomObject); }
   }

   public override bool IsReadOnly
   {
       get { return false; }
   }

   public override Type PropertyType
   {
       get { return typeof(string); }
   }

   public override bool CanResetValue(object component)
   {
       return (GetValue(component).Equals("") == false);
   }

   public override void ResetValue(object component)
   {
       SetValue(component, "");
   }

   public override bool ShouldSerializeValue(object component)
   {
       return false;
   }

   public override object GetValue(object component)
   {
       return ValuesContainer[Name];
   }

   public override void SetValue(object component, object value)
   {
      ValuesContainer[Name] = value.ToString();
   }
}
```

## And what now?
Now that was simple! We now have a object which can be dynamically be
populated with properties and values. Where this implementation is really
useful, is to get the most out of the
[.NET PropertyGrid Control](https://msdn.microsoft.com/en-us/library/aa302326.aspx).
Of course you can get fancy with attributes to for example provide a
description, category, etc.  You can also use the TypeConverterAttribute to
specify what editor should be used for a given property. Or even extend from
UITypeEditor to create your own editor.

For example, using the property grid to make a quick settings dialog or
a window containing a debug view for objects can easily be done like
this.

## Some background
Back in 2005 I created a [program](http://wixedit.sourceforge.net/) for a
[toolset](http://wixtoolset.org/) which was based on XML source files, but
also provided a .NET api. The .NET api changes from version to version,
which requires a new build to be made for my program. But loading the XML
Schema Definitions (XSD) allowed me to provide a dynamic user interface
for the ever changing toolset, and minimizing the need modify and build
my program over and over again.

