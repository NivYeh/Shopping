SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[orders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fullname] [nvarchar](255) NULL,
	[address] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[list] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[categories](
	[category] [varchar](255) NOT NULL,
	[products] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[category] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO



INSERT INTO [dbo].[categories] ([category], [products])
VALUES ('Cheeses', '["Cheddar","Brie","Mozzarella","Gouda","Parmesan","Feta"]');

INSERT INTO [dbo].[categories] ([category], [products])
VALUES ('Cosmetics', '["Lipstick","Foundation","Mascara","Face moisturizer","Nail polish","Shampoo"]');

INSERT INTO [dbo].[categories] ([category], [products])
VALUES ('Household Items', '["Toilet paper","Dish soap","Laundry detergent","Trash bags","Paper towels","Sponges"]');

INSERT INTO [dbo].[categories] ([category], [products])
VALUES ('Meat and Fish', '["Chicken breast","Ground beef","Salmon fillets","Pork chops","Shrimp","Turkey"]');

INSERT INTO [dbo].[categories] ([category], [products])
VALUES ('Pastries', '["Croissants","Danishes","Muffins","Eclairs","Cinnamon rolls","Tarts"]');

INSERT INTO [dbo].[categories] ([category], [products])
VALUES ('Vegetables and Fruits', '["Carrots","Spinach","Apples","Bananas","Tomatoes","Oranges"]');
GO
