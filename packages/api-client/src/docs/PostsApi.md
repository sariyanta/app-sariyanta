# PostsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getPost**](#getpost) | **GET** /api/posts/{slug} | |
|[**getPosts**](#getposts) | **GET** /api/posts | |

# **getPost**
> getPost()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

let slug: string; // (default to undefined)

const { status, data } = await apiInstance.getPost(
    slug
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **slug** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPosts**
> getPosts()


### Example

```typescript
import {
    PostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PostsApi(configuration);

const { status, data } = await apiInstance.getPosts();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

