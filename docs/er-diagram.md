erDiagram
    Branch ||--o{ User : "has"
    Branch ||--o{ StockMovement : "happens at"
    Branch ||--o{ Sale : "made at"
    
    User ||--o{ Sale : "processes"
    User ||--o{ StockMovement : "creates"
    
    Category ||--o{ Product : "contains"
    
    Product ||--o{ StockMovement : "moves"
    Product ||--o{ SaleItem : "sold as"
    
    Sale ||--|{ SaleItem : "contains"
    Sale ||--o{ Payment : "paid via"
    
    Supplier ||--o{ Purchase : "supplies"
    Purchase ||--|{ PurchaseItem : "contains"
    PurchaseItem }o--|| Product : "refers to"
    
    Customer ||--o{ Sale : "buys"
