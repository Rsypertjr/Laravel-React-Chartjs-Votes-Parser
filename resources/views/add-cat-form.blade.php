<!DOCTYPE html>
<html>
<head>
    <title>Laravel 8 Form Example Tutorial</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-4">
        @if(session('status'))
            <div class="alert alert-success">
                {{ session('status') }}
            </div>
        @endif
        <div class="card">
            <div class="card-header text-center font-weight-bold">
                Laravel 8 - Add Blog Post Form Example
            </div>
            <div class="card-body">
                <form name="add-cat-form" id="add-cat-form" method="post" action="{{url('store-form')}}">
                @csrf
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" class="form-control" required="">
                    </div>
                    <div class="form-group">
                        <label for="age">Age</label>
                        <input type="text" id="age" name="age" class="form-control" required="">
                    </div>
                    <div class="form-group">
                        <label for="color">Color</label>
                        <input type="text" id="color" name="color" class="form-control" required="">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>  
</body>
</html>